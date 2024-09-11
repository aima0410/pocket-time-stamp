function getCurrentTab(pathname: string) {
  switch (pathname) {
    case '/':
      return 'Home';
    case '/time-stamp':
      return 'CreateTimeStamp';
    case '/histories':
      return 'RecentHistories';
    case '/reports':
      return 'Reports';
    case '/collection':
      return 'Collection';
    default:
      return '404';
  }
}
export default getCurrentTab;
