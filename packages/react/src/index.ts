import React, { useRef, useState, useEffect, useMemo } from 'react';
import WatchingYouBase, {
  WatchingYouRenderTransform,
  WatchingYouOptions,
} from '../../core/src/index';
import { concatObject } from './util';

interface WatchingYouReactHookProps
  extends Omit<WatchingYouOptions, 'render'> {
  active?: boolean;
}
interface WatchingYouReactHocProps extends WatchingYouReactHookProps {
  children: React.ReactNode;
}

const useWatchingYou = (props: WatchingYouReactHookProps = {}) => {
  const {
    target,
    targetType,
    power,
    rotatable,
    movable,
    active = true,
  } = props;
  const watcherRef = useRef(null);
  const [transform, setTransform] =
    useState<WatchingYouRenderTransform>({
      translate: { x: 0, y: 0 },
      rotate: 0,
    });
  const watchingYouRef = useRef(
    new WatchingYouBase({
      ...props,
      customRender: (newTransform) => {
        setTransform(newTransform);
      },
    }),
  );
  useEffect(() => {
    watchingYouRef.current.setTarget({
      target,
      targetType,
    });
  }, [target, targetType]);
  useEffect(() => {
    watchingYouRef.current.setPower(power);
  }, [power]);
  useEffect(() => {
    watchingYouRef.current.setRotatable(rotatable);
  }, [rotatable]);
  useEffect(() => {
    watchingYouRef.current.setMovable(movable);
  }, [movable]);
  useEffect(() => {
    watchingYouRef.current.setWatcher(
      watcherRef.current || undefined,
    );
  }, [watchingYouRef]);
  useEffect(() => {
    if (active) {
      watchingYouRef.current.start();
      return watchingYouRef.current.stop;
    } else {
      watchingYouRef.current.stop();
      return;
    }
  }, [active]);
  useEffect(() => {
    watchingYouRef.current.start();
    return watchingYouRef.current.stop;
  }, []);
  const watchingYouWatcherProps = useMemo(() => {
    return {
      ref: watcherRef,
      style: {
        transform: `translate(${transform.translate.x}px,${transform.translate.y}px) rotate(${transform.rotate}deg)`,
      },
    };
  }, [
    transform.translate.x,
    transform.translate.y,
    transform.rotate,
  ]);
  return [watchingYouWatcherProps, watchingYouRef.current] as const;
};
const WatchingYou: React.FC<WatchingYouReactHocProps> = (props) => {
  const { children, ...watchingYouProps } = props;
  const [watchingYouWatcherProps] = useWatchingYou(watchingYouProps);
  if (!React.isValidElement(children)) return null;
  return React.cloneElement(
    children,
    concatObject(children.props, {
      ref: watchingYouWatcherProps.ref,
      style: concatObject(
        children?.props?.style,
        watchingYouWatcherProps.style,
      ),
    }),
  );
};

export default React.memo(WatchingYou);
export { useWatchingYou };
