#!/bin/bash

# If you are trying to debug node running on a vagrant VM using node-inspector, PHPStorm, or similar you will need to
# follow a few steps:
#  - make this script executable by running: `sudo chmod +x vagrant-node-debug.sh`
#  - Start your vagrant machine
#  - Run this script to open port 5858 in a way debuggers can access it: `./vagrant-node-debug.sh`
#  - Start your debugger on the host machine
#  - Start the process on your vagrant using 'node --debug' or 'node --debug-brk'



# SSH into a Vagrant VM, forwarding ports in a way that allows node within Vagrant to be debugged by a debugger
# or IDE in the host operating system. Don't know why, but Vagrantfile port forwarding does not work.
# (https://groups.google.com/forum/#!topic/vagrant-up/RzPooJ0dp6Q)

vagrant ssh-config > ~/vagrant-ssh.config
ssh -F ~/vagrant-ssh.config -L 127.0.0.1:5858:127.0.0.1:5858 default
