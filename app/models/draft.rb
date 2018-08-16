class Draft < ApplicationRecord
  has_many :teams
  accepts_nested_attributes_for :teams 
end
