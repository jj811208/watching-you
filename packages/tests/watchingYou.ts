import { isCI } from 'ci-info';
import WatchingYouFromDev from '../core/src';
import WatchingYouFromBuild from '../core';
import ReactWatchingYouFromDev from '../react/src';
import ReactWatchingYouFromBuild from '../react';
import VueWatchingYouFromDev from '../vue/src';
import VueWatchingYouFromBuild from '../vue';

const WatchingYou = isCI ? WatchingYouFromBuild : WatchingYouFromDev;

const ReactWatchingYou = isCI
  ? ReactWatchingYouFromBuild
  : ReactWatchingYouFromDev;

const VueWatchingYou = isCI
  ? VueWatchingYouFromBuild
  : VueWatchingYouFromDev;

export { WatchingYou, ReactWatchingYou, VueWatchingYou };
