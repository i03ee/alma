CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE order_status AS ENUM (
  'DRAFT', 'CREATED', 'SEARCHING_DRIVER', 'DRIVER_ASSIGNED', 'DRIVER_ACCEPTED',
  'DRIVER_ARRIVING', 'PICKUP_STARTED', 'PURCHASING', 'PURCHASE_EVIDENCE_PENDING',
  'PURCHASE_APPROVED', 'IN_TRANSIT', 'ARRIVED', 'DELIVERED', 'COMPLETED',
  'CANCELLED', 'EXPIRED', 'REJECTED', 'DISPUTED', 'FAILED'
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL UNIQUE,
  display_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name_ar text NOT NULL,
  name_en text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE service_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  boundary geography(POLYGON, 4326) NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX service_zones_boundary_gix ON service_zones USING gist (boundary);

CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_user_id uuid NOT NULL REFERENCES users(id),
  service_id uuid NOT NULL REFERENCES services(id),
  status order_status NOT NULL DEFAULT 'CREATED',
  pickup_location geography(POINT, 4326),
  dropoff_location geography(POINT, 4326),
  notes text,
  max_purchase_amount_iqd integer CHECK (max_purchase_amount_iqd IS NULL OR max_purchase_amount_iqd >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX orders_status_created_at_idx ON orders (status, created_at);
CREATE INDEX orders_pickup_location_gix ON orders USING gist (pickup_location);
CREATE INDEX orders_dropoff_location_gix ON orders USING gist (dropoff_location);

CREATE TABLE order_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id),
  from_status order_status,
  to_status order_status NOT NULL,
  actor_user_id uuid REFERENCES users(id),
  reason text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid REFERENCES users(id),
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX audit_logs_entity_idx ON audit_logs (entity_type, entity_id, created_at);
