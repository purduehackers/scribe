{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  # Add pnpm package manager
  buildInputs = with pkgs; [
    pnpm
    nodejs_latest
    corepack_latest
    nodePackages.svelte-language-server # Optional: Svelte language server for IDE support
  ];

  shellHook = ''
    # Optional: Automatically install dependencies when entering the shell
    pnpm install
  '';
}
