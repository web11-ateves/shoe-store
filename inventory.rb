#!/usr/bin/ruby

require 'json'

file = File.read('client/src/data.json')
data = JSON.parse(file)

STDOUT.sync = true

INVENTORY = Array(0..100)
RANDOMNESS = Array(1..3)

loop do
  RANDOMNESS.sample.times do
    puts JSON.generate({
      store: data["stores"].sample,
      model: data["models"].sample,
      inventory: INVENTORY.sample,
    }, quirks_mode: true)
  end
  sleep 1
end