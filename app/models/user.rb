class User < ApplicationRecord
  VALID_PLATFORMS = ['pc', 'psn', 'xbl'].freeze
  VALID_REGIONS = ['eu', 'us', 'kr', 'cn', 'global'].freeze
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :rememberable, :trackable, :validatable
  devise :omniauthable, omniauth_providers: [:bnet]

  validates :platform, inclusion: { in: VALID_PLATFORMS }, allow_nil: true
  validates :region, inclusion: { in: VALID_REGIONS }, allow_nil: true
  validates :email, presence: true
end
