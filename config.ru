require 'rubygems'
Gem.clear_paths

require 'sinatra'
require './app/website.rb'
run Application::Website
