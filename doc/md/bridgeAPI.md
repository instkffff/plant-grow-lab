# 桥接API

## websocket

ip: 127.0.0.1
port: 30000

## read

```json
{
    "func": "read",
    "node": "PLANT",
    "group": "G11",
    "tag": "Y"
}
```

response:

```json
{
    "func": "read",
    "node": "PLANT",
    "group": "G11",
    "tag": "Y",
    "value": 100
}
```

## write

```json
{
    "func": "write",
    "node": "PLANT",
    "group": "G11",
    "tag": "Y",
    "value": 2000
}
```

response:

```json
{
    "func": "write",
    "node": "PLANT",
    "group": "G11",
    "tag": "Y",
    "value": 2000,
    "status": "success" | "error"
}
```

## bridge

```json
{
    "func": "bridge",
    "node": "PLANT",
    "group": "G11",
    "tag": "Y",
    "value": 2000
}
```
