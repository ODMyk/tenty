import {RuleConfigSeverity} from '@commitlint/types';

export default {
  extends: [],
  rules: {'body-leading-blank': [RuleConfigSeverity.Warning, 'always']},
};
