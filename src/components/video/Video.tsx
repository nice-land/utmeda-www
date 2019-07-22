import React, { useState, useRef, useEffect } from 'react';
import { WebGLRenderer, OrthographicCamera, Scene, Mesh, ShaderMaterial, BoxGeometry } from 'three';
import { TweenLite, Power4 } from 'gsap';

import DisplacementMap from 'assets/images/displacementmap.png';

import createRippleShader from './createRippleShader';
import s from './Video.scss';

interface IProps {
  video: string;
  poster?: string;
  onVideoEnd(): void;
}

export const Video = ({ video, poster, onVideoEnd }: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [light, setLight] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<() => void>();
  const shader = useRef<ShaderMaterial>();

  const showLight = () => {
    setLight(true);
  };

  const showDark = () => {
    setLight(false);
  };

  const handleEnded = () => {
    onVideoEnd();
  };

  const render = () => {
    if (typeof window === 'undefined') {
      return;
    }

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
      canvas: canvasRef.current,
    });

    webglRenderer.setSize(offsetWidth, offsetHeight);

    const camera = new OrthographicCamera(
      offsetWidth / -2,
      offsetWidth / 2,
      offsetHeight / -2,
      offsetHeight / 2,
      1,
      100,
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
      DisplacementMap,
    );

    shader.current = new ShaderMaterial(shaderConfig);

    const videoPlane = new Mesh(
      new BoxGeometry(offsetWidth, offsetHeight, 0),
      shader.current,
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
      onComplete: renderer.current,
    });
  }, [light, shader, renderer]);

  return (
    <div className={s.video}>
      <div className={s(s.video__content)}>
        <video
          className={s.video__video}
          ref={videoRef}
          autoPlay
          muted
          src={video}
          poster={poster}
          onEnded={handleEnded}
        />

        <canvas
          ref={canvasRef}
          className={s.video__render}
          onMouseDown={showLight}
          onMouseUp={showDark}
          onTouchStart={showLight}
          onTouchEnd={showDark}
        />
      </div>
    </div>
  );
};
