ActiveRecord::Base.connection.execute(Rails.root.join("db", "seeds.sql").read)
