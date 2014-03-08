# Slim Template Engine
require 'slim'
require 'uglifier'
require 'rack/google_analytics'

set :slim, pretty: true

# Localization
activate :i18n, langs: [:en]
I18n.enforce_available_locales = false

# Pretty URLs
#activate :directory_indexes
#set :index_file, 'profile.html'

# GZip compression
activate :gzip

# Reload the browser automatically whenever files change
activate :livereload
config[:file_watcher_ignore] += [ /.idea\// ]

# Stylesheets Directory
set :css_dir, 'assets/stylesheets'

# Javascripts Directory
set :js_dir, 'assets/javascripts'

# Images Directory
set :images_dir, 'assets/images'

# Fonts Directory
set :fonts_dir,  'assets/fonts'

# Use relative URLs
set :relative_links, true

#set :environment, :build

# Google Analytics
#use Rack::GoogleAnalytics, :web_property_id => 'UA-3312587-3'

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

  # Use relative Assets
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

  def homepage_logo_class
    'hidden-xs invisible' if homepage?
  end

  # Full Name
  def full_name
    "#{I18n.t('profile.first_name')} #{I18n.t('profile.last_name')}"
  end

  # Duration Date
  def duration_date(m1, y1, m2, y2)
    html  = ""
    html += "#{I18n.t('month.'+m1)}" if m1 != ''
    html += " #{y1} - " if y1 != ''
    html += "#{I18n.t('month.'+m2)}" if m2 != ''
    html += " #{y2}" if y2 != ''
    html
  end

  # Contact Person
  def contact_person(contact = {})
    html  = ""
    html += (contact.email) == '' ? "#{I18n.t('xp.'+contact.person)}, #{I18n.t('xp.upon_request')}" : "<a href='mailto:#{contact.email}'>#{I18n.t('xp.'+contact.person)}</a>"
    html += (contact.phone) == '' ? '' : ", <span>#{contact.phone}</span>"
    html += ", <a href='http://#{contact.website}' target='_blank'>#{contact.website}</a>"
    html
  end

end