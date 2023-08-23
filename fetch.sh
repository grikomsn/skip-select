mkdir -p ./public/assets/
cd ./public/assets/

MOCK_HREFS=(
  https://skip-select.s3.amazonaws.com/skip_enabled_mev_revenue.json
  https://skip-select.s3.amazonaws.com/skip_enabled_revenue_chains.json
  https://skip-select.s3.amazonaws.com/skip_stats.json
  https://skip-select.s3.amazonaws.com/top_mev_validators.json
)

# https://skip-select.s3.amazonaws.com/$CHAIN/validators.json
SELECTED_CHAINS=(
  osmosis
  juno
  cosmoshub
  evmos
)

for HREF in "${MOCK_HREFS[@]}"; do
  wget -q "${HREF}"
done

for CHAIN in "${SELECTED_CHAINS[@]}"; do
  wget -q "https://skip-select.s3.amazonaws.com/${CHAIN}/validators.json" -O "${CHAIN}-validators.json"
done
