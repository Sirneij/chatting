# chatting

`chatting` is a full-stack private chatting application which uses modern technologies such as `Python` &mdash; `Django` and `Django channels` &mdash; and `TypeScript/JavaScript` &mdash; `SvelteKit`. Its real-time feature utilizes `WebSocket`.

`chatting` has `backend` and `frontend` directories. Contrary to its name, `backend` is a classic full-fledged application, not only backend code. Though not refined yet, you can chat and enjoy real-time conversations there as well. `frontend` does what it implies. It houses all user-facing codes, written using `SvelteKit` and `TypeScript`.

## Run locally

To locally run the app, clone this repository and then open two terminals. In one terminal, change directory to `backend` and in the other, to `frontend`. For the `frontend` terminal, you can run the development server using `npm run dev`:

```bash
╭─[Johns-MacBook-Pro] as sirneij in ~/Documents/Devs/chatting/frontend using node v18.11.0                                21:37:36
╰──➤ npm run dev
```

In the `backend` terminal, create and activate a virtual environment, on Linux and MacOS:

```bash
╭─ sirneij in ~/Documents/Devs/chatting/backend on (main)✘✘✘           22:18:38
╰─(ﾉ˚Д˚)ﾉ virtualenv virtualenv && source virtualenv/bin/activate
```

Then, install the project's dependencies:

```bash
╭─ sirneij in ~/Documents/Devs/chatting/backend on (main)✘✘✘           22:18:38
╰─(ﾉ˚Д˚)ﾉ (virtualenv) pip install -r requirements.txt
```

After that, migrate the app's models:

```bash
╭─ sirneij in ~/Documents/Devs/chatting/backend on (main)✘✘✘           22:18:38
╰─(ﾉ˚Д˚)ﾉ (virtualenv) python manage.py migrate
```

You can create a `superuser` and go on to the app's admin page to create users or, to ease the stress, I wrote a small script that uses `faker` to create five(5) users at a go. To use the script, do:

```bash
╭─ sirneij in ~/Documents/Devs/chatting/backend on (main)✘✘✘           22:18:38
╰─(ﾉ˚Д˚)ﾉ (virtualenv) python manage.py shell < chat/make_fake_users.py
```

You can now run the server and enjoy.

```bash
╭─ sirneij in ~/Documents/Devs/chatting/backend on (main)✘✘✘           22:18:38
╰─(ﾉ˚Д˚)ﾉ (virtualenv) python manage.py runserver
```
