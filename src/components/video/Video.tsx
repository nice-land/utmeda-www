import React, { useState, useRef, useEffect } from "react";
import {
  WebGLRenderer,
  OrthographicCamera,
  Scene,
  Mesh,
  ShaderMaterial,
  BoxGeometry
} from "three";
import s from "./Video.scss";
import createRippleShader from "./createRippleShader";
import DisplacementMap from "assets/images/displacementmap.png";
import { TweenLite, Power4 } from "gsap";

interface IProps {
  video: string;
  poster?: string;
}

export const Video = ({ video, poster }: IProps) => {
  const [light, setLight] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const renderer = useRef<Function>();
  const shader = useRef<ShaderMaterial>();

  const render = () => {
    requestAnimationFrame(render);

    if (renderer.current) {
      renderer.current();
    }
  };

  render();

  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) {
      return;
    }

    const { offsetWidth, offsetHeight } = canvasRef.current;

    const webglRenderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      canvas: canvasRef.current
    });

    webglRenderer.setSize(offsetWidth, offsetHeight);

    const camera = new OrthographicCamera(
      offsetWidth / -2,
      offsetWidth / 2,
      offsetHeight / -2,
      offsetHeight / 2,
      1,
      100
    );

    camera.position.z = 1;

    const scene = new Scene();

    const angle = Math.PI / 4;

    const shaderConfig = createRippleShader(
      videoRef.current,
      0.2,
      0.2,
      angle,
      -3 * angle,
      DisplacementMap
    );

    shader.current = new ShaderMaterial(shaderConfig);

    const videoPlane = new Mesh(
      new BoxGeometry(offsetWidth, offsetHeight, 0),
      shader.current
    );
    videoPlane.rotation.z = Math.PI;

    scene.add(videoPlane);

    renderer.current = () => {
      webglRenderer.render(scene, camera);
    };

    return () => {
      shader.current = undefined;
      renderer.current = undefined;
      webglRenderer.dispose();
    };
  }, [canvasRef, videoRef]);

  useEffect(() => {
    if (!shader.current || !renderer.current) {
      return;
    }

    TweenLite.to(shader.current.uniforms.dispFactor, 1, {
      value: Number(light),
      ease: Power4.easeOut,
      onUpdate: renderer.current,
      onComplete: renderer.current
    });
  }, [light, shader, renderer]);

  function showLight() {
    setLight(true);
  }

  function showDark() {
    setLight(false);
  }

  return (
    <div className={s.video}>
      <div className={s(s.video__content)}>
        <video
          className={s.video__video}
          ref={videoRef}
          autoPlay
          muted
          loop
          src={video}
          poster={poster}
        />

        <canvas
          ref={canvasRef}
          className={s.video__render}
          onMouseEnter={showLight}
          onMouseLeave={showDark}
          onTouchStart={showLight}
          onTouchEnd={showDark}
        />
      </div>
    </div>
  );
};
