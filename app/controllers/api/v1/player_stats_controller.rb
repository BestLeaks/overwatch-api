class Api::V1::PlayerStatsController < ApplicationController
require 'httparty'
skip_before_action :verify_authenticity_token
rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    @all_stats = PlayerStat.all
    # binding.remote_pry
    render json: {stats: @all_stats, user: current_user}
  end
  def update
    @twitch = PlayerStat.find_by(name: params[:name])
    data = JSON.parse(request.body.read)
    twitchID = data["twitchID"]
    twitchData = "https://twitch.tv/#{twitchID}"
    # binding.remote_pry
    @twitch.update(addTwitch: twitchData)
    render json: {stats: @twitch, user: current_user}
  end
  def show
    @stats = PlayerStat.find_by(name: params[:name])
    render json: {stats: @stats, user: current_user}
  end
  def data
    data = JSON.parse(request.body.read)
    profile = data["profile"]
    response = HTTParty.get("https://ovrstat.com/v1/stats/pc/us/" + profile)
    if response.code >= 400
      render :json => {:error => "not-found"}.to_json, :status => 404
    else
      if PlayerStat.exists?(name: profile)
        @player_stat = PlayerStat.find_by(name: profile)
        render json: {stats: @player_stat, user: current_user}
      else
        @player_stat = PlayerStat.create(name: profile, player_data: response)
        # @player_stat = PlayerStat.create(icon: response["icon"], name: profile, level: response["level"], levelIcon: response["levelIcon"], prestige: response["prestige"], prestigeIcon: response["prestigeIcon"], rating: response["rating"], ratingIcon: response["ratingIcon"], ratingName: response["ratingName"], gamesWon: response["gamesWon"])
        render json: {stats: @player_stat, user: current_user}
      end
    end

  end

  def not_found
    respond_with '{"error": "not_found"}', status: :not_found
  end
end
