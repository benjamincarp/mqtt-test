# == Class: global-npm
#
class global-npm {

  exec { 'npm-mocha':
    command => 'sudo npm install -g mocha'
  }

  exec { 'npm-mosca':
    command => 'sudo npm install -g mosca'
  }
}
