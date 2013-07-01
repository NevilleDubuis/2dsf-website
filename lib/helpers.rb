require 'nanoc-sprockets-filter'

include Nanoc::Helpers::Rendering
include Nanoc::Helpers::Capturing
include Nanoc::Helpers::Sprockets
include Nanoc::Helpers::LinkTo

PRODUCT_LINE_ROOT ||= '/jeux/'

def root_item
  @root_item ||= items.select {|item| item.identifier == '/' }
end

def product_lines
  @product_lines ||= items.select {|item| item.identifier =~ %r{^#{PRODUCT_LINE_ROOT}[^/]+/$} }
end

def products(product_line_item = :all)
  @products ||= {}
  @products[product_line_item] ||= begin
    if product_line_item == :all
      items.select {|item| item.identifier =~ %r{^#{PRODUCT_LINE_ROOT}} }
    else
      items.select {|item| item.identifier =~ %r{^#{product_line_item.identifier}(?:[^/]+/)?$} }
    end
  end
end

def product_line_of_product(product_item)
  @product_line_of_product ||= {}
  @product_line_of_product[product_item] ||= begin
    product_line_identifier = product_item.identifier.match(%r{^(#{PRODUCT_LINE_ROOT}[^/]+/)})[1]
    items.find {|item| item.identifier == product_line_identifier }
  end
rescue
  raise "Can't find product line for item “#{item.identifier}"
end

def product_siblings(product_item)
  products(product_line_of_product(product_item))
end

def product_image_path(item, options = {})
  product_key = item[:key]

  image_item = items.find {|i| i.identifier =~ %r{images/jeux_#{product_key}/$} }
  image_path image_item
end

def product_attr(item, attr)
  return nil unless item

  is_product = !!(item.identifier =~ /^#{PRODUCT_LINE_ROOT}/)
  item[attr] || (is_product && product_line_of_product(item)[attr]) || root_item[attr]
end

def is_current_item(target)
  item.identifier == target
end
