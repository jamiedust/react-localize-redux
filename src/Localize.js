// @flow
import React from 'react';
import { connect } from 'react-redux';
import { getActiveLanguage, getTranslate } from './locale';
import type { ComponentType } from 'react';
import type { MapStateToProps } from 'react-redux';
import type { LocaleState, Language, Translate } from './locale';

export type LocalizeStateProps = {
  currentLanguage: string,
  translate: Translate
};

const mapStateToProps = (slice: ?string): MapStateToProps<LocaleState, {}, LocalizeStateProps> => (state: Object|LocaleState): LocalizeStateProps => {
  const scopedState: LocaleState = (state instanceof Map ? state.get(slice) : slice && state[slice]) || state;
  return {
    currentLanguage: getActiveLanguage(scopedState).code,
    translate: getTranslate(scopedState)
  };
};

export const localize = (Component: ComponentType<any>, slice: ?string = null) => connect(mapStateToProps(slice))(Component);
