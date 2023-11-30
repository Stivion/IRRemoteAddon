# Dashboard custom cards
This cards is designed to be used with AC and soundbar integrations to provide UI for Home Assistant dashboard.

# AC Card
To add card to dashboard you need to add `/local/ac-card.js` resource. Then you need to go to `Raw configuration editor` and add this lines:

```yaml
- type: custom:ac-card
  entity: ir_remote_control.ac
```

# Soundbar card
To add card to dashboard you need to add `/local/soundbar-card.js` resource. Then you need to go to `Raw configuration editor` and add this lines:

```yaml
- type: custom:soundbar-card
```

Soundbar card doesn't require specific entity, because it doesn't have state. It works just from Home Assistant service calls.
