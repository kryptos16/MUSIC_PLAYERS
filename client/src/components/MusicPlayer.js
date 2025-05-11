import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import song1 from '../assets/1.mp3';
import song2 from '../assets/2.mp3';
import song3 from '../assets/3.mp3';
import song4 from '../assets/4.mp3';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(song1);
  const [songTitle, setSongTitle] = useState("Song 1");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentAlbumArt, setCurrentAlbumArt] = useState("https://via.placeholder.com/150?text=1");

  // Update current time
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  // Format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Change song
  const changeSong = (song, title, albumArt) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setCurrentSong(song);
    setSongTitle(title);
    setCurrentAlbumArt(albumArt);
    setCurrentTime(0);
    setIsPlaying(true); // auto-play new song
  };

  // Volume control
  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = e.target.value;
      setVolume(e.target.value);
    }
  };

  // Set current time manually
  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = e.target.value;
      setCurrentTime(e.target.value);
    }
  };

  // Handle metadata (duration) load
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateDuration = () => setDuration(audio.duration);
      audio.addEventListener('loadedmetadata', updateDuration);
      return () => audio.removeEventListener('loadedmetadata', updateDuration);
    }
  }, [currentSong]);

  // Handle time update
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, []);

  // Auto-play song when changed
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.play();
    }
  }, [currentSong]);

  return (
    <div className="music-player">
      <div className="player-header">
        <h2>{songTitle}</h2>
        <img src={currentAlbumArt} alt="Album Art" className="album-art" />
      </div>

      <audio ref={audioRef} src={currentSong} />

      <div className="controls">
        <button onClick={togglePlayPause} className="play-pause-btn">
          {isPlaying ? '⏸' : '▶️'}
        </button>

        <div className="progress-container">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
          />
          <div className="time">
            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="volume">
          <label>🔊</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>

        <div className="song-selection">
          <button onClick={() => changeSong(song1, "Song 1", "https://via.placeholder.com/150?text=1")}>Song 1</button>
          <button onClick={() => changeSong(song2, "Song 2", "https://via.placeholder.com/150?text=2")}>Song 2</button>
          <button onClick={() => changeSong(song3, "Song 3", "https://via.placeholder.com/150?text=3")}>Song 3</button>
          <button onClick={() => changeSong(song4, "Song 4", "https://via.placeholder.com/150?text=4")}>Song 4</button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
