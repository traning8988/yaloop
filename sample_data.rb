require 'time'

def seconds_to_hms(seconds)
  hours = seconds / 3600
  minutes = (seconds % 3600) / 60
  secs = seconds % 60

  format("%02d:%02d:%02d", hours, minutes, secs)
end

sample_study_data = [
  { id: 1, start_time: '2024-09-01 08:00:00', end_time: '2024-09-01 10:00:00', tasks_id: 1 },
  { id: 2, start_time: '2024-09-01 10:30:00', end_time: '2024-09-01 12:00:00', tasks_id: 2 },
  { id: 3, start_time: '2024-09-01 13:00:00', end_time: '2024-09-01 15:00:00', tasks_id: 1 },
  { id: 4, start_time: '2024-09-02 09:00:00', end_time: '2024-09-02 11:30:00', tasks_id: 3 },
  { id: 5, start_time: '2024-09-02 12:00:00', end_time: '2024-09-02 14:00:00', tasks_id: 2 },
  { id: 6, start_time: '2024-09-02 14:30:00', end_time: '2024-09-02 16:30:00', tasks_id: 4 }
]

# nilがあった場合はまだ書いてない
sample_study_duration_datas = sample_study_data.map do |sample_study_duration_data|
  start_time = Time.parse(sample_study_duration_data[:start_time])
  end_time = Time.parse(sample_study_duration_data[:end_time])
  duration_seconds = end_time - start_time # 学習時間の秒数
  puts "学習時間" + seconds_to_hms(duration_seconds)
  puts start_time.strftime("スタートタイム  %H:%M:%S")
  puts end_time.strftime("エンドタイム  %H:%M:%S")
  duration = seconds_to_hms(duration_seconds) # 学習時間の秒数を%H:%M:%Sに変換
end

p sample_study_duration_datas
