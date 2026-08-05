DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'tms') THEN
      PERFORM dblink_exec('dbname=' || current_database(), 'CREATE DATABASE tms');
   END IF;
END
$$;