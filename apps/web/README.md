# Portfolio web app
App for portfolio written with svelte kit.


## Development

### Data

All information is retrieved by the use of requests.

In **development**, the svelte kit server helps to serve data inside /data directory.

```
┌─────────────────────┬────────┐
│                     │        │
│                     │        │
│                     │        │
│      localhost      │◄───────┘
│                     │
│                     │
│                     │
└─────────────────────┘
```

In **production** build, data is retrieved by the production server.

```
┌─────────────────────┐            ┌──────────────────┐
│                     ├───────────►│                  │
│                     │            │                  │
│                     │            │                  │
│      localhost      │            │      NGINX       │
│                     │            │                  │
│                     │            │     (remote)     │
│                     │            │                  │
└─────────────────────┘            └──────────────────┘
```

## Release

It is recomended to first upload the yaml files.

```bash
# Upload data with rsync
$ rsync --partial -Pr ./apps/web/static/data iox:/var/www/html/prezento
```

Then a build can be produced and uploaded.
```bash
# Generate build version
$ npx turbo build --filter=web

# Upload release
$ rsync --partial -Pr ./apps/web/build/ iox:/var/www/html/prezento

```