window.onload = function() {
  var branchesList = document.getElementById('branches-list');
  var select = document.getElementById('file-select');
  var deleteBtn = document.getElementById('delete-btn');
  var branches = [];
  var selectedDirectory = "";

  select.onchange = onFileSelect;
  deleteBtn.onclick =onDeleteClicked;

  function onDeleteClicked() {
    getDeletableBranches()
      .then(deleteBranches)
      .then(function() {
        return getBranches(selectedDirectory);
      })
      .then(buildBranchesList)
      .catch(function(err) {
        console.log('Error deleting :: ', err);
      });
  }

  function getDeletableBranches() {
    return new Promise(function(resolve, reject) {
      var children = branchesList.childNodes;
      var deletable = [];

      for (var i = 0; i < children.length; i++) {
        let tag = children[i].tagName;
        let box = children[i].firstChild;

        if (tag === 'LI' && box.tagName === 'INPUT' && box.checked) {
          deletable.push(children[i].childNodes[1].nodeValue);
        }
      }

      resolve(deletable);
    });
  }

  function deleteBranches(list) {
    list = list.join(' ');

    return new Promise(function(resolve, reject) {
      if (!list.length) {
        return reject(new Error('Empty list'));
      }
    
      var child = require('child_process');
      var del = child.spawn('./delete-branches.sh', [
        '--directory', 
        selectedDirectory, 
        '--branches', 
        list
      ]);

      del.stdout.on('data', function (data) {
        branches = data.toString();
      });

      del.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      });

      del.on('close', function (code) {
        console.log('child process exited with code ' + code);
        resolve();
      });
    });
  }

  function onFileSelect(event) {
    selectedDirectory = select.files[0].path;
    
    clearBranches();
    getBranches(selectedDirectory).then(() => {
      buildBranchesList();
    });
  }

  function buildBranchesList() {
    var elements = [];

    branchesList.innerHTML = '';

    branches.forEach(function(b) {
      var li = document.createElement('LI');
      var name = document.createTextNode(b);
      var isCurrentBranch = b.indexOf('*') !== -1;
      var isMasterBranch = b.indexOf('master') !== -1;

      if (!isCurrentBranch && !isMasterBranch) {
        var box = document.createElement('INPUT');
        box.type = 'checkbox';

        li.appendChild(box);
      } else if (isMasterBranch) {
        li.classList.add('master');
      } else if (isCurrentBranch) {
        li.classList.add('current');
      }

      li.appendChild(name);
      branchesList.appendChild(li);
    });
  }

  function clearBranches() {
    branches = [];
  }

  function getBranches(directory) {
    branches = [];

    return new Promise(function(resolve, reject) {
      var child = require('child_process');
      var list = child.spawn('./get-branches.sh', ['--directory', directory]);

      list.stdout.on('data', function (data) {
        branches = data
          .toString()
          .split('\n')
          .filter((b) => b.trim().length > 0)
          .map((b) => {
            return b.trim();
          });
      });

      list.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      });

      list.on('close', function (code) {
        console.log('child process exited with code ' + code);
        resolve();
      });
    });
  }
}