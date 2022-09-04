import React, { useRef, useState, useEffect } from 'react';
import GazerBase, {
  GazerCoordinate,
  GazerProps as GazerPropsBase,
} from '../../core/src/index';

type GazerReactHookProps = Omit<
  GazerPropsBase,
  'observer' | 'render'
>;
interface GazerReactHocProps extends GazerReactHookProps {
  children: React.ReactNode;
}

const useGazer = (props: GazerReactHookProps) => {
  const { observed, observedType, power } = props;
  const observerRef = useRef<HTMLElement | undefined>(undefined);
  const [delta, setDelta] = useState<GazerCoordinate>({ x: 0, y: 0 });
  const gazerRef = useRef(
    new GazerBase({
      ...props,
      render: (delta) => {
        setDelta(delta);
      },
    }),
  );
  useEffect(() => {
    gazerRef.current.setObserved({ observed, observedType });
  }, [observed, observedType]);
  useEffect(() => {
    gazerRef.current.setPower(power);
  }, [power]);
  useEffect(() => {
    gazerRef.current.setObserver(observerRef.current);
  }, [gazerRef]);
  useEffect(() => {
    gazerRef.current.start();
    return gazerRef.current.cancel;
  }, []);

  return {
    ref: observerRef,
    style: {
      transform: `translate(${delta.x}px,${delta.y}px)`,
    },
  };
};
const Gazer: React.FC<GazerReactHocProps> = (props) => {
  const { children, ...gazerProps } = props;
  const gazerObserverProps = useGazer(gazerProps);

  if (!React.isValidElement(children)) return null;
  return React.cloneElement(children, {
    ...children.props,
    ref: gazerObserverProps.ref,
    style: {
      ...children?.props?.style,
      ...gazerObserverProps.style,
    },
  });
};

export default Gazer;
export { useGazer };
