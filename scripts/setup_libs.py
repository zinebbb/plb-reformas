import subprocess
import glob
import os
import shutil

lib_dir = "/home/zineb/.local/lib/x86_64-linux-gnu"
os.makedirs(lib_dir, exist_ok=True)

# Download debs
os.chdir("/tmp")
subprocess.run(["apt-get", "download", "libnspr4", "libnss3"], check=True)

debs = glob.glob("/tmp/libnspr4*.deb") + glob.glob("/tmp/libnss3*.deb")
ext_dir = "/tmp/nss-extracted"
os.makedirs(ext_dir, exist_ok=True)

for deb in debs:
    subprocess.run(["dpkg-deb", "-x", deb, ext_dir], check=True)

src_lib = os.path.join(ext_dir, "usr/lib/x86_64-linux-gnu")
if os.path.exists(src_lib):
    for item in os.listdir(src_lib):
        s = os.path.join(src_lib, item)
        d = os.path.join(lib_dir, item)
        if os.path.isdir(s):
            if os.path.exists(d): shutil.rmtree(d)
            shutil.copytree(s, d)
        else:
            shutil.copy2(s, d)

print("Extracted libraries to", lib_dir)
for f in os.listdir(lib_dir):
    print(" -", f)
