'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

interface FallingTextProps {
  text: string;
  highlightWords?: string[];
  trigger?: 'hover' | 'click' | 'auto';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  fontSize?: string;
  mouseConstraintStiffness?: number;
  className?: string;
}

const FallingText: React.FC<FallingTextProps> = ({
  text,
  highlightWords = [],
  trigger = 'hover',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 0.5,
  fontSize = '1.5rem',
  mouseConstraintStiffness = 0.7,
  className = '',
}) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const [isTriggered, setIsTriggered] = useState(trigger === 'auto');

  useEffect(() => {
    if (!sceneRef.current || !isTriggered) return;

    const { Engine, Render, Runner, Bodies, Composite, MouseConstraint, Mouse } = Matter;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    engine.gravity.y = gravity;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: sceneRef.current.clientHeight,
        wireframes: wireframes,
        background: backgroundColor,
      },
    });
    renderRef.current = render;

    // Create boundaries
    const ground = Bodies.rectangle(
      sceneRef.current.clientWidth / 2,
      sceneRef.current.clientHeight + 50,
      sceneRef.current.clientWidth,
      100,
      { isStatic: true }
    );

    const leftWall = Bodies.rectangle(
      -50,
      sceneRef.current.clientHeight / 2,
      100,
      sceneRef.current.clientHeight,
      { isStatic: true }
    );

    const rightWall = Bodies.rectangle(
      sceneRef.current.clientWidth + 50,
      sceneRef.current.clientHeight / 2,
      100,
      sceneRef.current.clientHeight,
      { isStatic: true }
    );

    // Create text bodies
    const words = text.split(' ');
    const textBodies = words.map((word, index) => {
      const isHighlight = highlightWords.some(hw =>
        word.toLowerCase().includes(hw.toLowerCase())
      );

      const x = (sceneRef.current!.clientWidth / (words.length + 1)) * (index + 1);
      const y = 50;

      return Bodies.rectangle(x, y, word.length * 15, 30, {
        render: {
          fillStyle: isHighlight ? '#f97316' : '#000000',
        },
        label: word,
      });
    });

    // Add all bodies to the world
    Composite.add(engine.world, [ground, leftWall, rightWall, ...textBodies]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(engine.world, mouseConstraint);

    // Run the engine and renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, [isTriggered, text, highlightWords, backgroundColor, wireframes, gravity, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (trigger === 'hover' || trigger === 'click') {
      setIsTriggered(true);
    }
  };

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      onClick={trigger === 'click' ? handleTrigger : undefined}
    >
      {!isTriggered && (
        <div
          className="flex items-center justify-center w-full h-full"
          style={{ fontSize }}
        >
          {text.split(' ').map((word, index) => {
            const isHighlight = highlightWords.some(hw =>
              word.toLowerCase().includes(hw.toLowerCase())
            );
            return (
              <span
                key={index}
                className={`${isHighlight ? 'text-orange-500' : 'text-foreground'} font-bold mx-1`}
              >
                {word}
              </span>
            );
          })}
        </div>
      )}
      <div ref={sceneRef} className="w-full h-full" />
    </div>
  );
};

export default FallingText;
