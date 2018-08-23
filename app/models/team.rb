class Team < ApplicationRecord
  belongs_to :draft
  has_many :picks
  has_many :players, through: :picks
end
