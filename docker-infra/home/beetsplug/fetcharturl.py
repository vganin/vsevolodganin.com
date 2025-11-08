"""Beets plugin to fetch album art from a specific URL.

This plugin provides a command that temporarily sets the cover_art_url field,
fetches the artwork, and then removes the temporary field.
"""

from beets.plugins import BeetsPlugin
from beets.ui import Subcommand, decargs
from beets import config


class FetchArtUrlPlugin(BeetsPlugin):
    """Plugin that fetches album art from a specific URL."""

    def commands(self):
        """Add the fetcharturl command."""
        cmd = Subcommand('fetcharturl', help='fetch album art from a specific URL')
        cmd.parser.add_option(
            '-u', '--url',
            dest='url',
            help='URL of the album art to fetch'
        )
        cmd.parser.add_option(
            '-f', '--force',
            dest='force',
            action='store_true',
            default=False,
            help='re-download art even if a file already exists'
        )
        cmd.func = self.fetch_art_from_url
        return [cmd]

    def fetch_art_from_url(self, lib, opts, args):
        """Fetch album art from the specified URL."""
        if not opts.url:
            self._log.error('URL is required. Use -u or --url to specify.')
            return

        # Parse query from arguments
        query = decargs(args)
        items = lib.items(query)
        albums = lib.albums(query)

        if not items and not albums:
            self._log.error('No items or albums matched the query.')
            return

        # Get unique albums from items
        album_set = set()
        for item in items:
            if item.album_id:
                album = lib.get_album(item.album_id)
                if album:
                    album_set.add(album.id)
        
        # Add albums from direct album query
        for album in albums:
            album_set.add(album.id)

        # Process each album
        for album_id in album_set:
            album = lib.get_album(album_id)
            if not album:
                continue
                
            self._log.info('Processing album: {0}', album)
            
            # Set the cover_art_url field
            album.cover_art_url = opts.url
            album.store()
            
            # Fetch the art
            force_flag = '-f' if opts.force else ''
            query_str = f'id:{album.id}'
            
            # Import the fetchart command
            from beetsplug.fetchart import FetchArtPlugin
            fetchart_plugin = FetchArtPlugin()
            
            # Create a mock opts object for fetchart
            class FetchOpts:
                def __init__(self, force):
                    self.force = force
                    self.cautious = False
                    self.maxwidth = 0
                    self.source = None
                    self.batch = False
                    self.quiet = False
            
            fetchart_opts = FetchOpts(opts.force)
            
            # Run fetchart on this album
            for cmd in fetchart_plugin.commands():
                if cmd.name == 'fetchart':
                    cmd.func(lib, fetchart_opts, [query_str])
                    break
            
            # Remove the cover_art_url field
            del album['cover_art_url']
            album.store()
            
            self._log.info('Completed processing for: {0}', album)
