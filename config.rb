# Slim Template Engine
require 'slim'
set :slim, pretty: true

# Localization
activate :i18n, langs: [:en]

# Pretty URLs
#activate :directory_indexes
#set :index_file, 'profile.html'

# Reload the browser automatically whenever files change
activate :livereload

# Stylesheets Directory
set :css_dir, 'stylesheets'

# Javascripts Directory
set :js_dir, 'javascripts'

# Images Directory
set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
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