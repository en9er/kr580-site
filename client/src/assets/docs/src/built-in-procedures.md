# Built in procedures

UMPK-80 has several built-in procedured which helps to work with it easily. All of them are listed in table below: 

|Title|Label|Description|
|-----|-----|-----------|
| Melody 1 | MELODY_1 | Start address: 0x05BA. No input data. No output data. |
|Melody 2 | MELODY_2 | Start address: 0x05B0. No input data. No output data. |
| Organ | ORGAN | Start address: 0x04FC. Input data: keyboard scancodes. No output data.|
| Stopwatch | STOPWATCH | Start address: 0x0481. Input: keyboard scancode "0" - reset, "1" start/stop. Current time can be seen on the display. |
| 1 millisecond sleep | FIX_SLEEP | Start address: 0x0429. | No input data. No output data. |
| Variable sleep | SLEEP | Start adress: 0x0430. Input data: milliseconds in BC register pair. No output data. |
| Single byte multiplication | MULT | Start address: 0x04E1. Input: multiplier in E register, multiplicanda in D register. Output: product in BC register pair. |
| Decode message to display | DECODE_DISPLAY | Start address: 0x01E9. Input: six codes in 0x0BF0-0x0BF5. Output: six decoded codes in 0x0BFA-0x0BFF.
| Detecting keystrokes | DETECT_KEYS | Start address: 0x0185. Input: pressing functional or numeric keys (except "Ст", "R"). Output: flag Z = 0 if key is pressed, Z = 1 otherwise. |
| Scan keyboards | SCAN_KEYBOARD | Start address: 0x014B. Input: keycodes in the key table. Output: scancode in A register. |
| Single scan of display | DISPLAY | Start address: 0x01C8. Input: values in 0x0BFA0-0x0BFF. Output: single output to display. |