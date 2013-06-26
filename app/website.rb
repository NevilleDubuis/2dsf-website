# encoding: utf-8
require 'sinatra/base'

require File.expand_path('../../config/application', __FILE__)

module Application
  class Website < Sinatra::Base
    set :static, true
    set :public, File.expand_path('../../public', __FILE__)
  end
end