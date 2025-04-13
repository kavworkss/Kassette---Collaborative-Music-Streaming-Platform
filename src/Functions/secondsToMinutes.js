export const secondsToMinutes = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec <= 9 ? '0' : ''}${Math.floor(sec)}`;
};

export const seekBarStyle = {
    width: '90%',
    height: '8px',
    position: 'relative'
};