# zsh aliases:
    # --- Git aliases (plain git, no wrapper — every repo behaves normally) ----
    alias gst='git status'
    alias gau='git add -u' # add only changed files, but this will not recognise or add new files.
    alias ga.='git add .'  # add all files, new ones too.
    alias gc='git commit -m '
    alias gpsh='git push origin main'
    alias gpll='git pull origin main'
    alias gl='git log --oneline -n 10'

# git sync commands
1. Check status
```bash
git status
```

2. Pull if necessary
```bash
git pull origin main
```

3. Commit message
```bash
git commit -m "some message"
```

4. Git push
```bash
git push origin main
```
