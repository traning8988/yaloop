require 'time'
require_relative 'fetch_times_table'

def seconds_to_hms(seconds)
  return if seconds.nil?

  hours = seconds / 3600
  minutes = (seconds % 3600) / 60
  secs = seconds % 60

  format("%02d:%02d:%02d", hours, minutes, secs)
end

# sample_study_datas = [
#   { id: 1, start_time: '2024-09-01 08:00:00', end_time: '2024-09-01 10:00:00', task_id: 1 },
#   { id: 2, start_time: '2024-09-01 10:30:00', end_time: '2024-09-01 12:00:00', task_id: 2 },
#   { id: 3, start_time: '2024-09-01 13:00:00', end_time: '2024-09-01 15:00:00', task_id: 1 },
#   { id: 4, start_time: '2024-09-02 09:00:00', end_time: '2024-09-02 11:30:00', task_id: 3 },
#   { id: 5, start_time: '2024-09-02 12:00:00', end_time: '2024-09-02 14:00:00', task_id: 2 },
#   { id: 6, start_time: '2024-09-02 14:30:00', end_time: '2024-09-02 16:30:00', task_id: 4 }
# ]
# データベース接続設定
# DB_CONFIG = {
#   host: ENV['DATABASE_HOST'],
#   username: ENV['DATABASE_USER'],
#   password: ENV['DATABASE_PASSWORD'],
#   database: ENV['DATABASE_NAME']
# }


# client = Mysql2::Client.new(DB_CONFIG)

# # データベースからtimesテーブルのデータを取得
# query = <<-SQL
#   SELECT times.id, times.start_time, times.end_time, times.tasks_id
#   FROM times
# SQL
# results = client.query(query, as: :hash)
# client.close

# # 結果を指定されたJSON形式に変換
# sample_study_datas = results.map do |row|
#   {
#     id: row['id'],
#     start_time: row['start_time'].strftime('%Y-%m-%d %H:%M:%S'),
#     end_time: row['end_time'].strftime('%Y-%m-%d %H:%M:%S'),
#     tasks_id: row['tasks_id']
#   }
# end

# # JSONとして出力
# JSON.pretty_generate(sample_study_datas)


$duration = {}

# nilがあった場合はまだ書いてない
def sample_study_duration_datas(sample_study_datas)
  daily_study_durations = {}
  total_task_study_durations = {}
  daily_task_study_durations = {}

  sample_study_datas.each do |sample_study_data|
    start_time = Time.parse(sample_study_data[:start_time])
    end_time = Time.parse(sample_study_data[:end_time])
    duration_seconds = end_time - start_time # 学習時間の秒数

    seconds_to_hms(duration_seconds) # 学習時間の秒数を%H:%M:%Sに変換

    date = start_time.to_date
    task_id = sample_study_data[:task_id]

    p daily_study_durations[date] = 0 unless daily_study_durations.key?(date)
    daily_study_durations[date] += duration_seconds

    total_task_study_durations[task_id] = 0 unless total_task_study_durations.key?(task_id)
    total_task_study_durations[task_id] += duration_seconds

    daily_task_study_durations[date] = {} unless daily_task_study_durations.key?(date)
    daily_task_study_durations[date][task_id] = 0 unless daily_task_study_durations[date].key?(task_id)
    daily_task_study_durations[date][task_id] += duration_seconds

  end

  daily_study_durations.each do |date, total_seconds|
    puts "#{date}: 合計学習時間 #{seconds_to_hms(total_seconds)}"
  end

  total_task_study_durations.each do |task_id, total_seconds|
    puts "  タスク#{task_id}: 合計学習時間 #{seconds_to_hms(total_seconds)}"
  end

  daily_task_study_durations.each do |date, tasks|
    puts "#{date}:"
    tasks.each do |task, total_seconds|
      puts "  タスク#{task}: 合計学習時間 #{seconds_to_hms(total_seconds)}"
    end
  end

  hours, minutes, seconds = seconds_to_hms(daily_study_durations.values.first).split(":")
  $duration = {
    duration_hour: hours,
    duration_minute: minutes,
    duration_second: seconds
  }
  p total_task_study_durations
  p daily_task_study_durations
end

sample_study_datas = fetch_times_data
sample_study_duration_datas(sample_study_datas) unless sample_study_datas.nil? || sample_study_datas.empty?
