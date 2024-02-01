import * as React from "react";

export const useDragRotatable = (
  onRotate?: ({ rotation }: { rotation: number }) => void
) => {
  const rotateObjectRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);

  const listener = React.useMemo(() => {
    return {
      onMouseDown: () => setIsDragging(true),
    };
  }, []);

  const onMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !rotateObjectRef.current) return;
      const rect = rotateObjectRef.current.getBoundingClientRect();

      const origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const mousePos = {
        x: e.clientX,
        y: e.clientY,
      };

      const rad = Math.atan2(mousePos.y - origin.y, mousePos.x - origin.x);

      const angle = (rad * 180) / Math.PI;

      setRotation(angle - 45);

      if (onRotate) {
        onRotate({ rotation: angle - 45 });
      }
    },
    [isDragging, onRotate]
  );

  React.useEffect(() => {
    addEventListener("mouseup", onMouseUp);
    addEventListener("mousemove", onMouseMove);

    return () => {
      removeEventListener("mouseup", onMouseUp);
      removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove, onMouseUp]);

  return {
    rotateObjectRef,
    listener,
    isDragging,
    rotation,
    transform: `rotate(${rotation}deg)`,
  };
};
