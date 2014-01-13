# Slim Template Engine
require 'slim'
require 'uglifier'
require 'rack/google_analytics'

set :slim, pretty: true

# Localization
activate :i18n, langs: [:en]


# Pretty URLs
#activate :directory_indexes
#set :index_file, 'profile.html'

# GZip compression
activate :gzip

# Reload the browser automatically whenever files change
activate :livereload

# Stylesheets Directory
set :css_dir, 'stylesheets'

# Javascripts Directory
set :js_dir, 'javascripts'

# Images Directory
set :images_dir, 'images'

# Google Analytics
use Rack::GoogleAnalytics, :web_property_id => 'UA-3312587-3'

# Build-specific configuration
configure :build do
  # Minify HTML
  activate :minify_html

  # Minify CSS
  activate :minify_css

  # Minify JS
  activate :minify_javascript, :compressor => Uglifier.new()

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets
end


# Custom Helpers
helpers do

  # Page Title
  def page_title
    current_page.data.title ? "#{I18n.t(current_page.data.title)} | #{I18n.t('profile.nickname')}" : I18n.t('profile.nickname')
  end

  # Active Menu Item
  def current_menu(page)
    'active' if @page_id == page
  end

  # Home Page
  def homepage?
    @page_id == '/' || @page_id == 'index.html'
  end

  # Full Name
  def full_name
    "#{I18n.t('profile.first_name')} #{I18n.t('profile.last_name')}"
  end

end