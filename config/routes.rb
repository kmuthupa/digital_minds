DigitalMinds::Application.routes.draw do
  match '/home' => 'pages#index', :as => :home
  match '/company' => 'pages#company', :as => :company
  match '/team' => 'pages#team', :as => :team
  match '/careers' => 'pages#careers', :as => :careers
  match '/services' => 'pages#services', :as => :services
  match '/contact' => 'pages#contact', :as => :contact
  root :to => 'pages#index'
end
