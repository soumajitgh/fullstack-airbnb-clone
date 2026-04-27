# Storage Migration

## Scope

The server now writes listing images to an S3-compatible object store using AWS SDK v3.
Local development uses `scireum/s3-ninja` from the root `docker-compose.yml`.

## Rollout Order

1. Start local dependencies with `docker compose up -d postgres s3ninja`.
2. Set the root S3 variables in `.env`.
3. Deploy the server with the new S3 configuration.
4. Verify that new listing image uploads write to S3 and return `publicUrl` values from `S3_PUBLIC_BASE_URL`.
5. Run `pnpm --filter @airbnb-clone/server storage:migrate:gcp-to-s3` to copy existing image objects and update database URLs.
6. Verify migrated records in the app and in the S3 store.
7. Remove any remaining GCP-only deployment secrets after production verification.

## Migration Script Behavior

The migration script:

- reads all `ListingImage` rows
- skips rows already pointing at the active S3 public base URL
- downloads each old `publicUrl`
- uploads the file to S3 using the existing `bucketLocation`
- updates `publicUrl` in the database

## Rollback

If migration verification fails:

1. Stop running the migration script.
2. Restore the previous storage configuration in deployment.
3. Re-run the server against the original object store.
4. Investigate only the failed image rows before retrying the migration.
