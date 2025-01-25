CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE ,
    password TEXT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profile_picture_url TEXT
);

CREATE TABLE IF NOT EXISTS projects (
    id BIGINT PRIMARY KEY,
    name VARCHAR(50),
    description TEXT,
    status VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner_id BIGINT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tickets (
    id BIGINT PRIMARY KEY,
    title VARCHAR(150),
    description TEXT,
    priority VARCHAR(30),
    status VARCHAR(30),
    issue_type VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT  CURRENT_TIMESTAMP,
    assignee_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    reporter_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sprints (
    id BIGINT PRIMARY KEY,
    number BIGINT NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activity_log (
    id BIGINT PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    activity VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ticket_id BIGINT REFERENCES tickets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
    id BIGINT PRIMARY KEY,
    content TEXT,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    ticket_id BIGINT REFERENCES tickets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_projects (
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, project_id)
);

CREATE TABLE IF NOT EXISTS pinned_projects (
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, project_id)
);