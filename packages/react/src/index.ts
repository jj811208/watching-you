import React, { useRef, useState, useEffect, useMemo } from 'react';
import GazerBase, {
  GazerRenderTransform,
  GazerProps as GazerPropsBase,
} from '../../core/src/index';
import { concatObject } from './util';

type GazerReactHookProps = Omit<
  GazerPropsBase,
  'observer' | 'render'
> & {
  active?: boolean;
};
interface GazerReactHocProps extends GazerReactHookProps {
  children: React.ReactNode;
}

const useGazer = (props: GazerReactHookProps) => {
  const {
    observed,
    observedType,
    power,
    rotatable,
    movable,
    active = true,
  } = props;
  const observerRef = useRef<any>(null);
  const [transform, setTransform] = useState<GazerRenderTransform>({
    translate: { x: 0, y: 0 },
    rotate: 0,
  });
  const gazerRef = useRef(
    new GazerBase({
      ...props,
      render: (newTransform) => {
        setTransform(newTransform);
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
    gazerRef.current.setRotatable(rotatable);
  }, [rotatable]);
  useEffect(() => {
    gazerRef.current.setMovable(movable);
  }, [movable]);
  useEffect(() => {
    gazerRef.current.setObserver(observerRef.current || undefined);
  }, [gazerRef]);
  useEffect(() => {
    if (active) {
      gazerRef.current.start();
      return gazerRef.current.cancel;
    } else {
      gazerRef.current.cancel();
      return;
    }
  }, [active]);
  useEffect(() => {
    gazerRef.current.start();
    return gazerRef.current.cancel;
  }, []);
  const gazerObserverProps = useMemo(() => {
    return {
      ref: observerRef,
      style: {
        transform: `translate(${transform.translate.x}px,${transform.translate.y}px) rotate(${transform.rotate}deg)`,
      },
    };
  }, [
    transform.translate.x,
    transform.translate.y,
    transform.rotate,
  ]);
  return gazerObserverProps;
};
const Gazer: React.FC<GazerReactHocProps> = (props) => {
  const { children, ...gazerProps } = props;
  const gazerObserverProps = useGazer(gazerProps);
  if (!React.isValidElement(children)) return null;
  return React.cloneElement(
    children,
    concatObject(children.props, {
      ref: gazerObserverProps.ref,
      style: concatObject(
        children?.props?.style,
        gazerObserverProps.style,
      ),
    }),
  );
};

export default React.memo(Gazer);
export { useGazer };
