class User < ApplicationRecord
  has_many :drafts
  validates :username, presence: true, uniqueness: true
end
