module.exports = {
  hooks: {
    'pre-commit': 'yarn workspaces run precommit',
    'prepare-commit-msg': 'exec < /dev/tty && git-cz --hook || true',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-push': 'yarn build && yarn run test'
  }
};
