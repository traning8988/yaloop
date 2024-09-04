require 'time'
require_relative 'fetch_times_table'

def sample_study_duration_datas(sample_study_datas)
  daily_study_durations = {}
  total_task_study_durations = {}
  daily_task_study_durations = {}
  $duration = {} # 1日のデータを全て入れる

  sample_study_datas.each do |sample_study_data|
    start_time = Time.parse(sample_study_data[:start_time])
    end_time = Time.parse(sample_study_data[:end_time])
    duration_seconds = end_time - start_time # 学習時間の秒数
    date = start_time.to_date
    task_title = sample_study_data[:title]

    seconds_to_hms(duration_seconds) # 学習時間の秒数を%H:%M:%Sに変換

    daily_study_durations[date] = 0 unless daily_study_durations.key?(date) # dateのkeyがないなら処理
    daily_study_durations[date] += duration_seconds

    total_task_study_durations[task_title] = 0 unless total_task_study_durations.key?(task_title) # task_titleのkeyがないなら処理
    total_task_study_durations[task_title] += duration_seconds

    daily_task_study_durations[date] = {} unless daily_task_study_durations.key?(date) # dateのkeyがないなら処理(2次元ハッシュ)
    daily_task_study_durations[date][task_title] = 0 unless daily_task_study_durations[date].key?(task_title) # dateをkeyに持つtask_titleのkeyがないなら処理(2次元ハッシュ)
    daily_task_study_durations[date][task_title] += duration_seconds
  end

  daily_study_durations.each do |date, total_seconds|
    puts "---(#{date})---"
    puts "学習時間: #{seconds_to_hms(total_seconds)}"
  end

  tasks_array = []
  puts "--- やったこと ---"
  total_task_study_durations.each do |task_title, total_seconds|
    task_hash = {
      title: task_title,
      time: seconds_to_hms_a(total_seconds)
    }
    tasks_array << task_hash

    puts "#{task_title} : #{seconds_to_hms(total_seconds)}時間"
  end


=begin
  daily_task_study_durations.each do |date, task_titles|
    puts "\n#{date}:"
    task_titles.each do |task_title, total_seconds|
      puts "  #{task_title}: 合計学習時間 #{seconds_to_hms(total_seconds)}"
    end
  end

    p total_task_study_durations
    p daily_task_study_durations
=end
  hours, minutes, seconds = seconds_to_hms(daily_study_durations.values.first).split(":") # 1日の学習時間
  
  $duration = {
    duration_hour: hours,
    duration_minute: minutes,
    duration_second: seconds,
    tasks: tasks_array
  }
end

def seconds_to_hms(seconds)
  return if seconds.nil?

  hours = seconds / 3600
  minutes = (seconds % 3600) / 60
  secs = seconds % 60

  format("%02d:%02d:%02d", hours, minutes, secs)
end

def seconds_to_hms_a(seconds)
  return if seconds.nil?

  hours = seconds / 3600
  minutes = (seconds % 3600) / 60

  format("%d時間%d分", hours, minutes)
end

def daily_report(daily_report_data)
  puts "良かったこと"
  puts daily_report_data[0][:description]
end

sample_study_datas = fetch_times_data_today
sample_study_duration_datas(sample_study_datas) unless sample_study_datas.nil? || sample_study_datas.empty?

report_today = fetch_report_today
$duration = $duration.merge(report_today[0]) # 日報をdurationに追加
daily_report(report_today) unless report_today.nil? || report_today.empty?

  # $duration[:tasks].each do |task|
  #   puts "#{task[:title]} は #{task[:time]} です"
  # end