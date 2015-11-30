# == Class: mongodb
#
class mongodb {

  exec { 'add-public-key':
    command => 'sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10'
  }

  exec { 'add-apt-repository-mongo':
    creates => '/etc/apt/sources.list.d/mongodb-org-3.0.list',
    command => 'echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list',
    require => Exec['add-public-key']
  }

  exec { 'apt-get-mongo':
    command => '/usr/bin/apt-get update',
    require => Exec['add-apt-repository-mongo']
  }

  package { 'mongodb-org':
    ensure  => present,
    require => [
      Exec['apt-get-mongo'],
      Exec['add-apt-repository-mongo']
    ]
  }
}
