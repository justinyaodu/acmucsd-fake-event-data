# Fake Event Data Generation

Generate fake member/event/attendance data, to test the [event data visualization portal](https://github.com/acmucsd/sp-cerulean).

1. Customize number of members and number of events in `tests/fake-data.test.ts`
2. Run `npm test 2> fake-data.json`
3. Edit `fake-data.json` to remove the control characters and other stuff at the beginning and end of the file
