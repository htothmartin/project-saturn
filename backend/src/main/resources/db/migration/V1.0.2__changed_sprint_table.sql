ALTER TABLE tickets ADD COLUMN sprint_id BIGINT references sprints(id) ON DELETE SET NULL;
ALTER TABLE sprints DROP COLUMN number;
ALTER TABLE sprints ADD COLUMN name VARCHAR(100);