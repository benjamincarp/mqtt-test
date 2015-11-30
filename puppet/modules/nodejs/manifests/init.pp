# == Class: nodejs
#
class nodejs {

  exec { 'node-curl':
    command => 'curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -'
  }
  exec { 'add-apt-repository-node-channel':
    command => 'sudo apt-get install -y nodejs',
    require => Exec['node-curl']
  }

  exec { 'apt-update':
    command => '/usr/bin/apt-get update',
    require => Exec['add-apt-repository-node-channel'],
    before  => Package['nodejs']
  }

  package { 'nodejs':
    ensure  => present,
    require => [
      Exec['apt-get update'],
      Exec['add-apt-repository-node-channel']
    ]
  }
}
