require 'time'
require_relative 'fetch_times_table'
$duration = {
  duration_hour: "00",
  duration_minute: "00",
  duration_second: "00",
  tasks:[{
    title: "NO DATA",
    hours: "00",
    minutes: "00",
    seconds: "00"
    }],
  id: 1,
  description: "今日の作業報告"
} # 1日のデータを全て入れる


def sample_study_duration_datas(sample_study_datas)
  daily_study_durations = {}
  total_task_study_durations = {}
  daily_task_study_durations = {}

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
    hours, minutes, seconds = seconds_to_hms(total_seconds).split(":")
    task_hash = {
      title: task_title,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }
    tasks_array << task_hash

    puts "#{task_title} : #{seconds_to_hms(total_seconds)}時間"
  end

  hours, minutes, seconds = seconds_to_hms(daily_study_durations.values.first).split(":") # 1日の学習時間

  {
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
  puts daily_report_data[:description]
end

today_study_datas = fetch_times_data(0) # 0で今日
today_datas = sample_study_duration_datas(today_study_datas) unless today_study_datas.nil? || today_study_datas.empty?
report_today = fetch_report(0)
today_datas ||= {}
today_datas = today_datas.merge(report_today) unless report_today.nil? || report_today.empty?

yesterday_study_datas = fetch_times_data(1) # １で昨日
yesterday_datas = sample_study_duration_datas(yesterday_study_datas) unless yesterday_study_datas.nil? || yesterday_study_datas.empty?
report_yesterday = fetch_report(1)
today_datas ||= {}
yesterday_datas = yesterday_datas.merge(report_yesterday) unless report_yesterday.nil? || report_yesterday.empty?

day_before_yesterday_study_datas = fetch_times_data(2) # 2で一昨日
day_before_yesterday_datas = sample_study_duration_datas(day_before_yesterday_study_datas) unless day_before_yesterday_study_datas.nil? || day_before_yesterday_study_datas.empty?
report_day_before_yesterday = fetch_report(2)
today_datas ||= {}
day_before_yesterday_datas = day_before_yesterday_datas.merge(report_day_before_yesterday) unless report_day_before_yesterday.nil? || report_day_before_yesterday.empty?

times_data_last_three_days = {
  today: today_datas,
  yesterday: yesterday_datas,
  day_before_yesterday: day_before_yesterday_datas
} # 今日から2日前までのデータ

$duration = $duration.merge(times_data_last_three_days) unless times_data_last_three_days.nil? || times_data_last_three_days.empty?



# sample_study_datas = fetch_times_data(2) # 0で今日、１で昨日、２で一昨日
# day_before_yesterday_datas = sample_study_duration_datas(sample_study_datas) unless sample_study_datas.nil? || sample_study_datas.empty?

# report_today = fetch_report(0)
# $duration = $duration.merge(report_today) unless report_today.nil? || report_today.empty? # 日報をdurationに追加
# daily_report(report_today) unless report_today.nil? || report_today.empty?

user = { user: fetch_user }
$duration = $duration.merge(user) unless user.nil? || user.empty?

total_times = { total_times: fetch_total_times }
$duration = $duration.merge(total_times) unless total_times.nil? || total_times.empty?

p $duration
